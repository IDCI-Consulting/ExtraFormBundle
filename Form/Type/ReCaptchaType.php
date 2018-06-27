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
     * Request Stack.
     *
     * @var RequestStack
     */
    private $requestStack;

    /**
     * @param array        $configurationParameters configurationParameters
     * @param RequestStack $requestStack
     */
    public function __construct(array $configurationParameters, RequestStack $requestStack)
    {
        $this->enabled = $configurationParameters['enabled'];
        $this->apiEndpoint = $configurationParameters['api_endpoint'];
        $this->requestStack = $requestStack;
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
            'enabled' => $this->enabled,
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
                if (!$this->enabled) {
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
}
