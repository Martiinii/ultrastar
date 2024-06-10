type SongListProps = {
  children: React.ReactNode;
};
export const SongList = ({ children }: SongListProps) => {
  return (
    <section className="flex flex-wrap gap-x-6 gap-y-10 justify-center">
      {children}
    </section>
  );
};
