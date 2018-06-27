<?php

namespace IDCI\Bundle\ExtraFormBundle\Validator\Constraints;

use IDCI\Bundle\ExtraFormBundle\ReCaptcha\RequestMethod\Post;
use ReCaptcha\ReCaptcha;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Authorization\AuthorizationChecker;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class ReCaptchaVerifiedValidator extends ConstraintValidator
{
    /**
     * Enable recaptcha.
     *
     * @var bool
     */
    protected $enabled;

    /**
     * Request Stack.
     *
     * @var RequestStack
     */
    protected $requestStack;

    /**
     * HTTP Proxy informations.
     *
     * @var array
     */
    protected $httpProxy;

    /**
     * Enable serverside host check.
     *
     * @var bool
     */
    protected $enableHostCheck;

    /**
     * Authorization Checker.
     *
     * @var AuthorizationChecker
     */
    protected $authorizationChecker;

    /**
     * Trusted Roles.
     *
     * @var array
     */
    protected $trustedRoles;

    /**
     * The reCAPTCHA API endpoint.
     *
     * @var string
     */
    protected $recaptchaApiEndpoint;

    /**
     * @param array                              $recaptchaConfiguration
     * @param RequestStack                       $requestStack
     * @param AuthorizationCheckerInterface|null $authorizationChecker
     */
    public function __construct(
        array $recaptchaConfiguration,
        RequestStack $requestStack,
        AuthorizationCheckerInterface $authorizationChecker = null
    ) {
        $this->enabled = $recaptchaConfiguration['parameters']['enabled'];
        $this->httpProxy = $recaptchaConfiguration['http_proxy'];
        $this->recaptchaApiEndpoint = $recaptchaConfiguration['parameters']['api_endpoint'];
        $this->enableHostCheck = $recaptchaConfiguration['parameters']['enable_host_check'];
        $this->authorizationChecker = $authorizationChecker;
        $this->trustedRoles = $recaptchaConfiguration['parameters']['trusted_roles'];
        $this->requestStack = $requestStack;
    }

    /**
     * {@inheritdoc}
     */
    public function validate($value, Constraint $constraint)
    {
        // if recaptcha is disabled, always valid
        if (!$this->enabled) {
            return;
        }

        // if we have an authorized role
        if ($this->authorizationChecker
            && count($this->trustedRoles) > 0
            && $this->authorizationChecker->isGranted($this->trustedRoles)) {
            return;
        }

        // Verify user response with Google
        $masterRequest = $this->requestStack->getMasterRequest();
        $remoteip = $masterRequest->getClientIp();
        $requestMethod = new Post($this->recaptchaApiEndpoint, $this->httpProxy);

        $recaptcha = new ReCaptcha($constraint->getPrivateKey(), $requestMethod);
        $response = $recaptcha->verify($value, $remoteip);

        if (!$response->isSuccess()) {
            $this->context->addViolation($constraint->message);
        }

        // Perform server side hostname check
        elseif ($this->enableHostCheck && $response->getHostname() !== $masterRequest->getHost()) {
            $this->context->addViolation($constraint->invalidHostMessage);
        }
    }
}
