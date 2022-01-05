import path from 'path';
import { Plugin } from 'vite';
import svgIconsPlugin from 'vite-plugin-svg-icons';

/**
 * Svg Sprite 插件
 * @returns
 */
export default function createSvgIconsPlugin(): Plugin {
  return svgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    symbolId: 'icon-[name]',
  });
}
