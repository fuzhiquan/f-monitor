import babel from 'rollup-plugin-babel'

export default {
    input: './src/index.js',
    output: {
        file: '../f-server/public/monitor.js',
        format: 'umd'
    },
    watch: 'node_modules/**',
    plugins: [
        babel({
            babelrc: false,
            presets: [
                '@babel/preset-env'
            ]
        })
    ]
}