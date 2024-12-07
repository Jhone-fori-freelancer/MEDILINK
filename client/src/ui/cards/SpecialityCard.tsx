import Link from "next/link";
import Image from "next/image"
import { IconCardiology, IconNeurology, IconPediatrics, IconSurgery, IconTraumatology } from "@/components/icons";
import SpecialityImage from "/public/logo.png";

interface Props {
  name?: string;
  img: string;
}

const iconMap: { [key: string]: JSX.Element } = {
  Cardiologia: <IconCardiology color="#004784" />,
  Cirugia: <IconNeurology color="#004784" />,
  Pediatria: <IconPediatrics color="#004784" />,
  Pediatra: <IconPediatrics color="#004784" />,
  Neurologia: <IconSurgery color="#004784" />,
  Traumatologia: <IconTraumatology color="#004784" />,
  Cardiología: <IconCardiology color="#004784" />,
  Cirugía: <IconNeurology color="#004784" />,
  Pediatría: <IconPediatrics color="#004784" />,
  Pediátra: <IconPediatrics color="#004784" />,
  Neurología: <IconSurgery color="#004784" />,
  Traumatología: <IconTraumatology color="#004784" />,
};

export function SpecialityCard({ name, img }: Props) {
  const iconSrc = name && iconMap[name] ? iconMap[name] : '';
  console.log(img);

  return (
    <Link href={`/specialty/${name}`} className="min-h-[184px] h-[184px] min-w-[275px] flex flex-col rounded-t-[6px] xl:w-[275px] lg:w-[250px]">
      <>
        {typeof iconSrc === 'string' ? (
          <div className="flex justify-center items-center h-[120px] w-full bg-blue-50 rounded-t lg:w-[275px]">
            <Image src={SpecialityImage} height={120} width={275} alt={name + " image"} className="rounded-t object-contain h-full" />
          </div>
        ) : (
          <div className="flex justify-center items-center h-[120px] w-full bg-blue-50 rounded-t lg:w-[275px]">
            {iconSrc}
          </div>
        )}
      </>
      <div className="flex items-center h-[66px] px-3 border-b-2 border-x-2 border-[#D9D9D9] rounded-b-[6px]">
        <span className="text-xl">{name}</span>
      </div>
    </Link>
  );
}