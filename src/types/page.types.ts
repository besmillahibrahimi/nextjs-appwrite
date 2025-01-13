type PagePropsWithAlertMessage = {
  searchParams: Promise<AlertMessage>;
};

type LocaleParams = {
  params: Promise<{ locale: string }>;
};

type PageProps = Partial<PagePropsWithAlertMessage> & LocaleParams;
