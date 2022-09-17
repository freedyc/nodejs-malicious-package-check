import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { cleandir } from 'rollup-plugin-cleandir';

export default {
    input: 'index.mjs',
    output: {
        file: 'bin/mpc.js',
        format: 'cjs'
    },
    plugins: [
        cleandir('./bin'),
        nodeResolve({
            extensions: [".mjs", ".json"],
            modulesOnly: true,
            preferredBuiltins: false,
        }),
        babel({ babelHelpers: 'bundled' }),
        terser(),
    ]
};
