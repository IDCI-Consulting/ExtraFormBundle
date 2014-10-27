<?php

/**
 * 
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 *
 */

namespace IDCI\ExtraFormBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

/**
 * This is the class that validates and merges configuration from your app/config files
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/extension.html#cookbook-bundles-extension-config-class}
 */
class Configuration implements ConfigurationInterface
{
    /**
     * {@inheritDoc}
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('idci_extra_form');

        // Here you should define the parameters that are allowed to
        // configure your bundle. See the documentation linked above for
        // more information on that topic.
        $rootNode
            ->children()
                ->append($this->addExtraFormTypesNode())
                ->append($this->addExtraFormConstraintsNode())
            ->end()
        ;

        return $treeBuilder;
    }

    /**
     * addExtraFormTypesNode
     *
     * @return ArrayNodeDefinition|NodeDefinition
     */
    protected function addExtraFormTypesNode()
    {
        $builder = new TreeBuilder();
        $node = $builder->root('types');

        $node
            ->defaultValue(array())
            ->useAttributeAsKey('id')
            ->prototype('array')
                ->children()
                    ->scalarNode('parent')->defaultNull()->end()
                    ->scalarNode('form_type')->isRequired()->end()
                    ->booleanNode('abstract')->defaultFalse()->end()
                    ->scalarNode('description')->defaultNull()->end()
                    ->arrayNode('extra_form_options')
                        ->defaultValue(array())
                        ->prototype('array')
                            ->children()
                                ->scalarNode('extra_form_type')->end()
                                ->arrayNode('options')
                                    ->prototype('variable')->end()
                                ->end()
                                ->arrayNode('constraints')
                                    ->prototype('variable')->end()
                                ->end()
                            ->end()
                        ->end()
                    ->end()
                ->end()
            ->end()
        ;

        return $node;
    }

    /**
     * addFormFieldConstraintsNode
     *
     * @return ArrayNodeDefinition|NodeDefinition
     */
    protected function addFormFieldConstraintsNode()
    {
        $builder = new TreeBuilder();
        $node = $builder->root('constraints');

        return $node;
    }
}