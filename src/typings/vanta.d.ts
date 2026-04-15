declare module 'vanta/dist/vanta.halo.min' {
  const HALO: (options: Record<string, unknown>) => {
    destroy: () => void;
    setOptions?: (o: Record<string, unknown>) => void;
  };
  export default HALO;
}

declare module 'vanta/dist/vanta.net.min' {
  const NET: (options: Record<string, unknown>) => {
    destroy: () => void;
    setOptions?: (o: Record<string, unknown>) => void;
  };
  export default NET;
}

declare module 'vanta/dist/vanta.fog.min' {
  const FOG: (options: Record<string, unknown>) => {
    destroy: () => void;
    setOptions?: (o: Record<string, unknown>) => void;
  };
  export default FOG;
}
