<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\ArrayNodeDefinition;
use Symfony\Component\Config\Definition\Builder\NodeDefinition;
use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

/**
 * This is the class that validates and merges configuration from your app/config files.
 *
 * To learn more see
 * {@link http://symfony.com/doc/current/cookbook/bundles/extension.html#cookbook-bundles-extension-config-class}
 */
class Configuration implements ConfigurationInterface
{
    /**
     * {@inheritdoc}
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
                ->scalarNode('working_dir')->defaultValue('/tmp/idci_extra_form')->end()
                ->append($this->addExtraFormTypesNode())
                ->append($this->addExtraFormConstraintsNode())
                ->append($this->addExtraFormConfiguratorsNode())
            ->end()
        ;

        return $treeBuilder;
    }

    /**
     * addExtraFormTypesNode.
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
                    ->scalarNode('icon')->defaultNull()->end()
                    ->arrayNode('extra_form_options')
                        ->defaultValue(array())
                        ->useAttributeAsKey('id')
                        ->prototype('array')
                            ->children()
                                ->scalarNode('extra_form_type')->isRequired()->end()
                                ->arrayNode('options')
                                    ->defaultValue(array())->useAttributeAsKey('id')->prototype('variable')->end()
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
     * addExtraFormConstraintsNode.
     *
     * @return ArrayNodeDefinition|NodeDefinition
     */
    protected function addExtraFormConstraintsNode()
    {
        $builder = new TreeBuilder();
        $node = $builder->root('constraints');

        $node
            ->defaultValue(array())
            ->useAttributeAsKey('id')
            ->prototype('array')
                ->children()
                    ->scalarNode('class')->isRequired()->end()
                    ->scalarNode('description')->defaultNull()->end()
                    ->arrayNode('extra_form_options')
                        ->defaultValue(array())
                        ->useAttributeAsKey('name')
                        ->prototype('array')
                            ->children()
                                ->scalarNode('extra_form_type')->isRequired()->end()
                                ->arrayNode('options')
                                    ->defaultValue(array())->useAttributeAsKey('id')->prototype('variable')->end()
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
     * addExtraFormConfiguratorsNode.
     *
     * @return ArrayNodeDefinition|NodeDefinition
     */
    protected function addExtraFormConfiguratorsNode()
    {
        $builder = new TreeBuilder();
        $node = $builder->root('configurations');

        $node
            ->defaultValue(array())
            ->useAttributeAsKey('id')
            ->prototype('array')
                ->children()
                    ->scalarNode('name')->defaultNull()->end()
                    ->arrayNode('fields')
                        ->defaultValue(array())
                        ->useAttributeAsKey('id')
                        ->prototype('array')
                            ->children()
                                ->scalarNode('extra_form_type')->isRequired()->end()
                                ->arrayNode('options')
                                    ->defaultValue(array())->useAttributeAsKey('id')->prototype('variable')->end()
                                ->end()
                                ->arrayNode('constraints')
                                    ->defaultValue(array())->prototype('variable')->end()
                                ->end()
                            ->end()
                        ->end()
                    ->end()
                    ->arrayNode('options')
                        ->defaultValue(array())
                        ->useAttributeAsKey('id')
                        ->prototype('variable')
                        ->end()
                    ->end()
                ->end()
            ->end()
        ;

        return $node;
    }
}
