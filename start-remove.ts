/* eslint-disable */
// @ts-nocheck
import fs from 'node:fs';
import path from 'node:path';
import { locale } from './locale-path';
import { deleteLinesInRange } from './helper';

const escapeRegExp = (str) => {
  return str.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&'); // 转义正则特殊字符
};

const rmSpecial = (content) => {
  let tempContent = content;
  // 特殊处理1
  const rmTxts = [
    'const { t } = useI18n();',
    "import { useI18n } from 'vue-i18n';",
    "import i18n from './locale';",
    'app.use(i18n);',
    "import { LOCALE_OPTIONS } from '@/locale';",
    'const locales = [...LOCALE_OPTIONS];',
    'const { changeLocale, currentLocale } = useLocale();',
    "import useLocale from '@/hooks/locale';",
  ];
  rmTxts.forEach((rmTxt) => {
    if (tempContent.includes(rmTxt)) {
      const regex = new RegExp(`^\\s*${escapeRegExp(rmTxt)}\\s*$`, 'gm'); // 逐行匹配
      tempContent = tempContent.replace(regex, ''); // 替换匹配的行为空
    }
  });
  // 特殊处理2
  tempContent = tempContent.replaceAll(
    "t(element?.meta?.locale || '')",
    "element?.meta?.locale || ''"
  );
  return tempContent;
};


export const start = (filePath) => {
  const regexs = [
    {
      regex: /{{\s*\$t\('([^']+)'\)\s*}}/g, // {{ $t('settings.title') }}
      handler: (match, p1) => locale[p1],
    },
    {
      regex: /{{\s*\$t\(([^)]+)\)\s*}}/g, // {{ $t(option.name) }}
      handler: (match, p1) => `{{ ${p1} }}`,
    },

    {
      regex: /:\s*t\(['"]([^'"]+)['"]\)/g, // : t('xxx')
      handler: (match, p1) => `: '${locale[p1]}'`,
    },
    {
      regex: /\(t\(['"]([^'"]+)['"]\)\)/g, // (t('xxx'))
      handler: (match, p1) => `('${locale[p1]}')`,
    },
    {
      regex: /\$t\(['"]([^'"]+)['"]\)/g, // $t('xxx')
      handler: (match, p1) => (locale[p1] ? `'${locale[p1]}'` : p1),
    },
  ];
 

  // 特殊处理：删除页面内语言切换模块
  if (filePath.indexOf('components/navbar/index.vue') > -1) {
    deleteLinesInRange(filePath, 35, 63);
  }

  // 特殊处理：替换App.vue
  if(filePath.indexOf('App.vue') > -1){
    const fileB = path.resolve('bin','rm-i18n','App.vue');
    fs.copyFileSync(fileB, filePath);
  }

  setTimeout(() => {
    let content = fs.readFileSync(filePath, 'utf-8');
    // 规则处理
    regexs.forEach((item) => {
      content = content.replace(item.regex, item.handler);
    });

    // 特殊处理
    content = rmSpecial(content);

    // 特殊处理：再去匹配任何特征都没有的部分（主要是js部分）
    Object.keys(locale).forEach((key) => {
      content = content.replace(
        new RegExp(`'${key}'`, 'g'),
        `'${locale[key]}'`
      );
    });

    fs.writeFileSync(filePath, content, 'utf-8');
  });
};
