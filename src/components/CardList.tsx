import {
  useDisclosure,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards = [] }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleViewImage = (url: string): void => {
    setSelectedImage(url);
    onOpen();
  };

  return (
    <>
      <Wrap>
        {cards.map(card => (
          <WrapItem key={card.ts}>
            <Card data={card} viewImage={handleViewImage} />
          </WrapItem>
        ))}
      </Wrap>
      <ModalViewImage
        isOpen={isOpen}
        onClose={onClose}
        imgUrl={selectedImage}
      />
    </>
  );
}
