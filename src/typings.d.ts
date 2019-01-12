declare module '*.html' {
  const content: string;
  export = content;
}

interface Navigator {
  credentials: {
    get: (options: any) => Promise<any>;
  };
}
