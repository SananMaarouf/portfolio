import React from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface CarouselCardProps {
  src: string;
  alt: string;
  title: string;
  description: string;
  bgColor?: string;
}

const CarouselCard: React.FC<CarouselCardProps> = ({ src, alt, title, description }) => {
  return (
    <Card className="border-red-500 border-2 p-0" >
      <Image
        src={src}
        alt={alt}
        width={200}
        height={200}
        objectFit="cover"
        className="rounded-xl w-full h-full"      />
      <CardContent>
        <h3 className="font-silkscreen text-2xl">{title}</h3>
        <p className="text-2xl">{description}</p>
      </CardContent>
      <CardFooter className="hover:underline hover:underline-offset-2 decoration-2">
        <button className="btn btn-primary text-xl">View Project</button>
      </CardFooter>
    </Card>
  );
};

export default CarouselCard;