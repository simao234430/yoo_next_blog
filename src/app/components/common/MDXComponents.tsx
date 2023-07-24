 
'use client'
import { useMDXComponent } from 'next-contentlayer/hooks';
import CustomAvatar from './CustomAvatar';
import BrandLogo from './BrandLogo';
import Pre from './Pre';
import { Button } from 'antd';
import { View } from './View';
 
const components = {
    pre: Pre,
    BrandLogo,
    CustomAvatar,
    Button: ({ ...props }) => <Button {...props} />,
 
    View: ({ ...props }) => <View {...props} />,
  };

 
export default function MarkdownContent({ code }: { code: string }) {
const MDXContent = useMDXComponent(code);

// @ts-ignore
return <MDXContent components={components} />;
}
  