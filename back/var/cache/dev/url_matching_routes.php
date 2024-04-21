<?php

/**
 * This file has been auto-generated
 * by the Symfony Routing Component.
 */

return [
    false, // $matchHost
    [ // $staticRoutes
        '/category' => [[['_route' => 'app_category_getcategory', '_controller' => 'App\\Controller\\CategoryController::getCategory'], null, null, null, false, false, null]],
        '/category/create' => [[['_route' => 'app_category_createcategory', '_controller' => 'App\\Controller\\CategoryController::createCategory'], null, ['POST' => 0, 'GET' => 1], null, false, false, null]],
        '/category/edit' => [[['_route' => 'app_category_editcategory', '_controller' => 'App\\Controller\\CategoryController::editCategory'], null, ['POST' => 0, 'GET' => 1], null, false, false, null]],
        '/composition' => [[['_route' => 'app_composition_getcompositions', '_controller' => 'App\\Controller\\CompositionController::getCompositions'], null, null, null, false, false, null]],
        '/composition/create' => [[['_route' => 'app_composition_createcomposition', '_controller' => 'App\\Controller\\CompositionController::createComposition'], null, ['POST' => 0, 'GET' => 1], null, false, false, null]],
        '/ingredient' => [[['_route' => 'app_ingredient_getingredients', '_controller' => 'App\\Controller\\IngredientController::getIngredients'], null, null, null, false, false, null]],
        '/ingredient/create' => [[['_route' => 'app_ingredient_createingredient', '_controller' => 'App\\Controller\\IngredientController::createIngredient'], null, ['POST' => 0, 'GET' => 1], null, false, false, null]],
        '/ingredient/edit' => [[['_route' => 'app_ingredient_editingredient', '_controller' => 'App\\Controller\\IngredientController::editIngredient'], null, ['POST' => 0, 'GET' => 1], null, false, false, null]],
        '/product' => [[['_route' => 'app_product_getproducts', '_controller' => 'App\\Controller\\ProductController::getProducts'], null, null, null, false, false, null]],
        '/product/create' => [[['_route' => 'app_product_createproduct', '_controller' => 'App\\Controller\\ProductController::createProduct'], null, ['POST' => 0, 'GET' => 1], null, false, false, null]],
        '/product/edit' => [[['_route' => 'app_product_editproduct', '_controller' => 'App\\Controller\\ProductController::editProduct'], null, ['POST' => 0, 'GET' => 1], null, false, false, null]],
    ],
    [ // $regexpList
        0 => '{^(?'
                .'|/api(?'
                    .'|/\\.well\\-known/genid/([^/]++)(*:43)'
                    .'|(?:/(index)(?:\\.([^/]++))?)?(*:78)'
                    .'|/(?'
                        .'|docs(?:\\.([^/]++))?(*:108)'
                        .'|contexts/([^.]+)(?:\\.(jsonld))?(*:147)'
                        .'|errors/([^/]++)(?'
                            .'|(*:173)'
                        .')'
                        .'|validation_errors/([^/]++)(?'
                            .'|(*:211)'
                        .')'
                    .')'
                .')'
                .'|/_error/(\\d+)(?:\\.([^/]++))?(*:250)'
                .'|/c(?'
                    .'|ategory/delete/([0-9]+)(*:286)'
                    .'|omposition/(?'
                        .'|([0-9]+)(*:316)'
                        .'|delete/([0-9]+)(*:339)'
                    .')'
                .')'
                .'|/ingredient/(?'
                    .'|([0-9]+)(*:372)'
                    .'|delete/([0-9]+)(*:395)'
                .')'
                .'|/product/(?'
                    .'|([0-9]+)(*:424)'
                    .'|d(?'
                        .'|elete/([0-9]+)(*:450)'
                        .'|ate/([0-9]+)(*:470)'
                    .')'
                .')'
            .')/?$}sDu',
    ],
    [ // $dynamicRoutes
        43 => [[['_route' => 'api_genid', '_controller' => 'api_platform.action.not_exposed', '_api_respond' => 'true'], ['id'], null, null, false, true, null]],
        78 => [[['_route' => 'api_entrypoint', '_controller' => 'api_platform.action.entrypoint', '_format' => '', '_api_respond' => 'true', 'index' => 'index'], ['index', '_format'], null, null, false, true, null]],
        108 => [[['_route' => 'api_doc', '_controller' => 'api_platform.action.documentation', '_format' => '', '_api_respond' => 'true'], ['_format'], null, null, false, true, null]],
        147 => [[['_route' => 'api_jsonld_context', '_controller' => 'api_platform.jsonld.action.context', '_format' => 'jsonld', '_api_respond' => 'true'], ['shortName', '_format'], null, null, false, true, null]],
        173 => [
            [['_route' => '_api_errors_problem', '_controller' => 'api_platform.symfony.main_controller', '_format' => null, '_stateless' => true, '_api_resource_class' => 'ApiPlatform\\State\\ApiResource\\Error', '_api_operation_name' => '_api_errors_problem'], ['status'], ['GET' => 0], null, false, true, null],
            [['_route' => '_api_errors_hydra', '_controller' => 'api_platform.symfony.main_controller', '_format' => null, '_stateless' => true, '_api_resource_class' => 'ApiPlatform\\State\\ApiResource\\Error', '_api_operation_name' => '_api_errors_hydra'], ['status'], ['GET' => 0], null, false, true, null],
            [['_route' => '_api_errors_jsonapi', '_controller' => 'api_platform.symfony.main_controller', '_format' => null, '_stateless' => true, '_api_resource_class' => 'ApiPlatform\\State\\ApiResource\\Error', '_api_operation_name' => '_api_errors_jsonapi'], ['status'], ['GET' => 0], null, false, true, null],
        ],
        211 => [
            [['_route' => '_api_validation_errors_problem', '_controller' => 'api_platform.symfony.main_controller', '_format' => null, '_stateless' => true, '_api_resource_class' => 'ApiPlatform\\Symfony\\Validator\\Exception\\ValidationException', '_api_operation_name' => '_api_validation_errors_problem'], ['id'], ['GET' => 0], null, false, true, null],
            [['_route' => '_api_validation_errors_hydra', '_controller' => 'api_platform.symfony.main_controller', '_format' => null, '_stateless' => true, '_api_resource_class' => 'ApiPlatform\\Symfony\\Validator\\Exception\\ValidationException', '_api_operation_name' => '_api_validation_errors_hydra'], ['id'], ['GET' => 0], null, false, true, null],
            [['_route' => '_api_validation_errors_jsonapi', '_controller' => 'api_platform.symfony.main_controller', '_format' => null, '_stateless' => true, '_api_resource_class' => 'ApiPlatform\\Symfony\\Validator\\Exception\\ValidationException', '_api_operation_name' => '_api_validation_errors_jsonapi'], ['id'], ['GET' => 0], null, false, true, null],
        ],
        250 => [[['_route' => '_preview_error', '_controller' => 'error_controller::preview', '_format' => 'html'], ['code', '_format'], null, null, false, true, null]],
        286 => [[['_route' => 'app_category_deletecategory', '_controller' => 'App\\Controller\\CategoryController::deleteCategory'], ['id'], null, null, false, true, null]],
        316 => [[['_route' => 'app_composition_getproduitcomposition', '_controller' => 'App\\Controller\\CompositionController::getProduitComposition'], ['id'], null, null, false, true, null]],
        339 => [[['_route' => 'app_composition_deletecomposition', '_controller' => 'App\\Controller\\CompositionController::deleteComposition'], ['id'], null, null, false, true, null]],
        372 => [[['_route' => 'app_ingredient_getproduct', '_controller' => 'App\\Controller\\IngredientController::getProduct'], ['id'], null, null, false, true, null]],
        395 => [[['_route' => 'app_ingredient_deleteingredient', '_controller' => 'App\\Controller\\IngredientController::deleteIngredient'], ['id'], null, null, false, true, null]],
        424 => [[['_route' => 'app_product_getproduct', '_controller' => 'App\\Controller\\ProductController::getProduct'], ['id'], null, null, false, true, null]],
        450 => [[['_route' => 'app_product_deleteproduct', '_controller' => 'App\\Controller\\ProductController::deleteProduct'], ['id'], null, null, false, true, null]],
        470 => [
            [['_route' => 'app_product_getproductdateexp', '_controller' => 'App\\Controller\\ProductController::getProductDateExp'], ['id'], null, null, false, true, null],
            [null, null, null, null, false, false, 0],
        ],
    ],
    null, // $checkCondition
];
