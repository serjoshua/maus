export async function http<T>(
  path: string,
  request?: RequestInit | undefined
): Promise<T> {
  const response: Response = await fetch(path, {
    ...(request ? request : {}),
  });

  if (!response.ok) {
    const message = `Failure loading ${response.url} with status ${response.status} (${response.statusText})`;
    console.dir(message);
    throw new Error(message);
  }

  return await response.json();
}

export async function dataset<TRes>(): Promise<TRes> {
  return await http<TRes>(`${process.env.REACT_APP_MAUS_DATA}`);
}
