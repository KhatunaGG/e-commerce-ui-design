// 'use client';
// import { usePathname } from 'next/navigation';
// import { useEffect } from 'react';
// import useManageImageStore from '@/app/store/manage-image.store';

// const GlobalPathTracker = () => {
//   const path = usePathname();
//   const setPath = useManageImageStore((state) => state.setPath);


//   useEffect(() => {
//     setPath(path);
//   }, [path]);

//   return null; 
// };

// export default GlobalPathTracker;



// 'use client';
// import { usePathname } from 'next/navigation';
// import { useEffect } from 'react';


// const extractPageFromPath = (path: string) => {
//   if (path.includes('sign-in')) return 'sign-in';
//   if (path.includes('sign-up')) return 'sign-up';
//   if (path === '/' || path.includes('home')) return 'home';
//   return ''; 
// };

// const GlobalPathTracker = () => {
//   const path = usePathname();
//   const { setPath, fetchImagesByPage } = useManageImageStore();

//   useEffect(() => {
//     const page = extractPageFromPath(path);
//     if (page) {
//       setPath(page);
//       fetchImagesByPage(page);
//     }
//   }, [path,       setPath, fetchImagesByPage ]);

//   return null;
// };

// export default GlobalPathTracker;
