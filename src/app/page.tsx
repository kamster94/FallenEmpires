'use client';

import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import { getGeneralSetting } from '@/app/actions';
import MarkdownContent from '@/components/Markdown/MarkdownContent';
import { GeneralSettingKey } from '@/enums';
import { useEffect, useState } from 'react';

export default function Home() {
  const [homePageText, setHomePageText] = useState<string>('');
  useEffect(() => {
    getGeneralSetting(GeneralSettingKey.HomePageText).then(
      (homePageTextSetting) => {
        if (homePageTextSetting) {
          setHomePageText(homePageTextSetting.value ?? '');
        }
      }
    );
  }, []);

  return (
    <Page>
      <PageHeader title='Age of Fallen Empires' />
      <MarkdownContent>{homePageText}</MarkdownContent>
    </Page>
  );
}
