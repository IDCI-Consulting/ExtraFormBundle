<?php

namespace IDCI\Bundle\ExtraFormBundle\Form\Type;

use IDCI\Bundle\ExtraFormBundle\Validator\Constraints\ReCaptchaVerified;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\OptionsResolver\Options;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

/**
 * A field for entering a recaptcha text.
 */
class ReCaptchaType extends AbstractType
{
    /**
     * The ReCaptcha API endpoint.
     *
     * @var string
     */
    private $apiEndpoint;

    /**
     * Enable recaptcha?
     *
     * @var bool
     */
    private $enabled;

    /**
     * Trusted roles
     *
     * @var array
     */
    private $trustedRoles;

    /**
     * Request Stack.
     *
     * @var RequestStack
     */
    private $requestStack;

    /**
     * Authorization checker.
     *
     * @var AuthorizationCheckerInterface
     */
    private $authChecker;

    /**
     * @param array        $configurationParameters configurationParameters
     * @param RequestStack $requestStack
     */
    public function __construct(
        array $configurationParameters,
        RequestStack $requestStack,
        AuthorizationCheckerInterface $authChecker
    ) {
        $this->enabled = $configurationParameters['enabled'];
        $this->apiEndpoint = $configurationParameters['api_endpoint'];
        $this->trustedRoles = $configurationParameters['trusted_roles'];
        $this->requestStack = $requestStack;
        $this->authChecker = $authChecker;
    }

    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('reCaptchaResponse', HiddenType::class, array(
                'constraints' => array(
                    new ReCaptchaVerified($options['private_key']),
                ),
            ))
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        $language = !empty($options['language']) ?
            $options['language'] :
            $this->requestStack->getMasterRequest()->getLocale()
        ;

        $view->vars = array_replace($view->vars, array(
            'api_endpoint' => $this->apiEndpoint,
            'bind_selector' => $options['bind_selector'],
            'enabled' => $this->isEnabled(),
            'language' => $language,
            'url_challenge' => sprintf('%s?hl=%s', sprintf('%s.js', $this->apiEndpoint), $language),
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $defaultAttributes = array(
            'data-async' => false,
            'data-badge' => null,
            'data-bind' => null,
            'data-bind' => null,
            'data-callback' => 'onReCaptchaSuccess',
            'data-expired-callback' => 'onReCaptchaExpired',
            'data-error-callback' => 'onReCaptchaError',
            'data-defer' => false,
            'data-expiredCallback' => null,
            'data-size' => 'normal',
            'data-theme' => 'light',
            'data-type' => 'image',
        );

        $resolver
            ->setRequired(array(
                'private_key',
                'public_key',
            ))
            ->setDefaults(array(
                'attr' => $defaultAttributes,
                'bind_selector' => null,
                'language' => null,
            ))
            ->setNormalizer('attr', function (Options $options, $value) use ($defaultAttributes) {
                $value = array_replace_recursive($defaultAttributes, $value);
                $value['data-sitekey'] = $options['public_key'];
                if ('invisible' === $value['data-size']) {
                    $value = array_replace_recursive($value, [
                        'defer' => true,
                        'async' => true,
                    ]);
                }

                return $value;
            })
            ->setNormalizer('label_attr', function (Options $options, $value) {
                if (!$this->isEnabled()) {
                    $value['style'] = 'display: none;';
                }

                return $value;
            })
            ->setAllowedTypes('bind_selector', ['null', 'string'])
            ->setAllowedTypes('language', ['null', 'string'])
            ->setAllowedTypes('private_key', ['string'])
            ->setAllowedTypes('public_key', ['string'])
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'extra_form_recaptcha';
    }

    /**
     * Is the recaptcha form field enabled ?
     *
     * @return bool
     */
    private function isEnabled()
    {
        if (!$this->enabled) {
            return false;
        }

        foreach ($this->trustedRoles as $trustedRole) {
            if ($this->authChecker->isGranted($trustedRole)) {
                return false;
            }
        }

        return true;
    }
}
