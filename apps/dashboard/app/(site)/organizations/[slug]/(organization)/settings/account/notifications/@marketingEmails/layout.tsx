import * as React from 'react';

import { AnnotatedSection } from '@workspace/ui/components/annotated';

export default function MarketingEmailsLayout({
  children
}: React.PropsWithChildren): React.JSX.Element {
  return (
    <AnnotatedSection
      title="Marketing emails"
      description="Receive emails about new products, features, and more."
    >
      {children}
    </AnnotatedSection>
  );
}
