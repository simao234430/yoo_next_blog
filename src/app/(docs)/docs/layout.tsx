import  { DocSidebar } from '@/src/app/components/Sidebar';
import { PageNavigation } from '@/src/app/components/PageNavigation';
import { Params } from '@/src/app/types';
import { allDocs} from 'contentlayer/generated';
 
import { notFound } from 'next/navigation';
export default function DocsLayout({ children }: { children: ReactNode }) {
    
 
  return (
    <div className="container max-w-8xl h-full flex items-center mx-auto">
    <div className="flex w-full">
      <div className="hidden 2xl:block 2xl:w-1/6  ">
        <DocSidebar />
      </div>

      <div className="w-full 2xl:block 2xl:w-5/6 min-h-[85vh] mb-4">{children}</div>
    </div>
  </div>
    );
  }
  