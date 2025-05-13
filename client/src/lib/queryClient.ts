import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
  });

  await throwIfResNotOk(res);
  return res;
}

// For GitHub Pages static hosting, map API paths to JSON files
const getStaticDataPath = (apiPath: string): string => {
  const pathMapping: Record<string, string> = {
    '/api/portfolio': '/data/portfolio.json',
    '/api/apps': '/data/apps.json',
  };
  
  // Check if it's a detail view (like /api/apps/1)
  const appDetailMatch = apiPath.match(/^\/api\/apps\/(\d+)$/);
  const portfolioDetailMatch = apiPath.match(/^\/api\/portfolio\/(\d+)$/);
  
  if (appDetailMatch) {
    return `/data/apps.json#${appDetailMatch[1]}`;
  }
  
  if (portfolioDetailMatch) {
    return `/data/portfolio.json#${portfolioDetailMatch[1]}`;
  }
  
  return pathMapping[apiPath] || apiPath;
};

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const apiPath = queryKey[0] as string;
    const staticPath = getStaticDataPath(apiPath);
    
    // Handle ID-specific requests (detail views)
    if (staticPath.includes('#')) {
      const [filePath, itemId] = staticPath.split('#');
      const res = await fetch(filePath);
      await throwIfResNotOk(res);
      const items = await res.json();
      const item = items.find((i: any) => i.id === parseInt(itemId));
      if (!item) {
        throw new Error(`Item with ID ${itemId} not found`);
      }
      return item;
    }
    
    // Handle regular list requests
    const res = await fetch(staticPath);
    
    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
