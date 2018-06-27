<?php

namespace IDCI\Bundle\ExtraFormBundle\ReCaptcha\RequestMethod;

use ReCaptcha\RequestMethod;
use ReCaptcha\RequestParameters;

/**
 * Sends POST requests to the reCAPTCHA service though a proxy.
 */
class Post implements RequestMethod
{
    /**
     * HTTP Proxy informations.
     *
     * @var array
     */
    private $httpProxy;

    /**
     * The reCAPTCHA verify server URL.
     *
     * @var string
     */
    private $recaptchaVerifyUrl;

    /**
     * Constructor.
     *
     * @param array  $httpProxy            proxy data to connect to
     * @param string $recaptchaApiEndpoint
     */
    public function __construct($recaptchaApiEndpoint, array $httpProxy = [])
    {
        $this->recaptchaVerifyUrl = sprintf('%s/siteverify', $recaptchaApiEndpoint);
        $this->httpProxy = $httpProxy;
    }

    /**
     * Submit the POST request with the specified parameters.
     *
     * @param RequestParameters $params Request parameters
     *
     * @return string Body of the reCAPTCHA response
     */
    public function submit(RequestParameters $params)
    {
        $peer_key = version_compare(PHP_VERSION, '5.6.0', '<') ? 'CN_name' : 'peer_name';
        $options = array(
            'http' => array(
                'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                'method' => 'POST',
                'content' => $params->toQueryString(),
                // Force the peer to validate (not needed in 5.6.0+, but still works)
                'verify_peer' => true,
                // Force the peer validation to use www.google.com
                $peer_key => 'www.google.com',
            ),
        );

        if (null !== $this->httpProxy['host'] && null !== $this->httpProxy['port']) {
            $options = array_replace_recursive($options, array(
                'http' => array(
                    'header' => "Content-type: application/x-www-form-urlencoded\r\n".sprintf('Proxy-Authorization: Basic %s', base64_encode($this->httpProxy['auth'])),
                    'proxy' => sprintf('tcp://%s:%s', $this->httpProxy['host'], $this->httpProxy['port']),
                    // While this is a non-standard request format, some proxy servers require it.
                    'request_fulluri' => true,
                ),
            ));
        }

        $context = stream_context_create($options);

        return file_get_contents($this->recaptchaVerifyUrl, false, $context);
    }
}
