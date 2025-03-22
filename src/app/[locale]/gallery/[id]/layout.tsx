import Image from 'next/image';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="fixed top-0 left-0 z-10 w-screen h-screen bg-white bg-opacity-10">
      <div className="absolute w-screen h-screen">
        <Image
          className="pointer-events-none h-full w-full"
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAlgCWAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAFAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAT/xAAdEAACAgIDAQAAAAAAAAAAAAABAgAFAxEEEiHB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAT/xAAZEQEBAQADAAAAAAAAAAAAAAABAgADEUH/2gAMAwEAAhEDEQA/AIKC1NXSDkLhGUs4Xq7HXp19iIiOW5EH3T3JT27/2Q=="
          priority={true}
          alt="Blurred background"
          fill
          sizes="100vw"
        />
      </div>
      {children}
    </div>
  );
}
