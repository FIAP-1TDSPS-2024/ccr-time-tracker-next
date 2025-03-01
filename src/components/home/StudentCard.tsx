import Image from "next/image";

interface StudentCardProps {
  name: string;
  rm: string;
  image: string;
  github: string;
  linkedin: string;
}

export function StudentCard({
  name,
  rm,
  image,
  github,
  linkedin,
}: StudentCardProps) {
  return (
    <div className="flex flex-col items-center p-4 m-2 rounded">
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <h2 className="text-xl font-bold text-gray-800">{rm}</h2>
      </div>
      <Image
        src={image}
        alt={name}
        width={200}
        height={200}
        className="rounded-full border-4 border-black my-4"
      />
      <div className="flex gap-4 mt-4">
        <a href={github} target="_blank" rel="noopener noreferrer">
          <Image src="/github.svg" alt="GitHub" width={24} height={24} />
        </a>
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          <Image src="/linkedin.svg" alt="LinkedIn" width={24} height={24} />
        </a>
      </div>
    </div>
  );
}
