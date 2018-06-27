<?php

namespace IDCI\Bundle\ExtraFormBundle\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 * @Target("PROPERTY")
 */
class ReCaptchaVerified extends Constraint
{
    public $message = 'This value is not a valid captcha.';
    public $invalidHostMessage = 'The captcha was not resolved on the right domain.';

    private $privateKey;

    /**
     * @param string $privateKey
     */
    public function __construct($privateKey)
    {
        $this->privateKey = $privateKey;
    }

    /**
     * {@inheritdoc}
     */
    public function getTargets()
    {
        return Constraint::PROPERTY_CONSTRAINT;
    }

    /**
     * {@inheritdoc}
     */
    public function validatedBy()
    {
        return 'idci_extra_form_recaptcha.verified';
    }

    /**
     * @return string $privateKey
     */
    public function getPrivateKey()
    {
        return $this->privateKey;
    }
}
