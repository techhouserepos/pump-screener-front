function unprotectLinkOfCFIPFS(url: string | null): string | null {
  if (!url) return url;
  return url.replace("https://cf-ipfs.com/ipfs/", "https://ipfs.io/ipfs/");
}

export default unprotectLinkOfCFIPFS;
