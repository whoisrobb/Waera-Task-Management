import { useBoardStore } from "@/providers/board-provider";

type CardTitleProps = {
    name: string;
}

const CardTitle = ({ name }: CardTitleProps) => {
    const { boardData } = useBoardStore();
  return (
    <div>
      <p className="text-muted-foreground">{boardData?.name}</p>
      <p className="text-2xl font-bold">{name}</p>
    </div>
  )
}

export default CardTitle
