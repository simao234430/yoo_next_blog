 
'use client'
import { useMDXComponent } from 'next-contentlayer/hooks';
import CustomAvatar from './CustomAvatar';
import BrandLogo from './BrandLogo';
import Pre from './Pre';
import { Button } from 'antd';
import { View } from './View';
import { H2, H3, H4  } from '@/src/app/components/common/Headings'
// import { Link } from '@/src/app/components/common/Link'
const components = {
    pre: Pre,
    BrandLogo,
    CustomAvatar,
    Button: ({ ...props }) => <Button {...props} />,
    h2: H2,
    h3: H3,
    h4: H4,
    View: ({ ...props }) => <View {...props} />,
  };

 
export default function MarkdownContent({ code }: { code: string }) {
const MDXContent = useMDXComponent(code);

// @ts-ignore
return  <MDXContent components={components} />;
}
  