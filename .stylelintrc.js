module.exports = {
    'extends': [
        'stylelint-config-recommended-vue',
        'stylelint-config-tencent'
    ],
    'plugins': ['stylelint-order'],
    'rules': {
        'no-empty-source': null,
        'value-no-vendor-prefix': [true, {
            'ignoreValues': ['box']
        }],
        'property-no-vendor-prefix': [true, {
            'ignoreProperties': ['box-orient']
        }],
        'font-family-no-missing-generic-family-keyword': null,
        'order/order': [
            'custom-properties',
            'declarations'
        ]
    },
    'overrides': [
        {
            'files': ['*.vue', '**/*.vue'],
            'rules': {
                'unit-allowed-list': ['em', 'rem', 's', 'px', '%']
            }
        }
    ]
}