import { Card } from "@/lib/types";
import Labels from "../_components/labels";
import DatePicker from "../_components/date-picker";

type ActiveCardHeaderProps = {
    card: Card;
}

const ActiveCardHeader = ({ card }: ActiveCardHeaderProps) => {
  return (
    <div className="grid grid-cols-2 w-full gap-2">
        <div className="">Members</div>
        <div className="">Dummy text</div>

        <div className="">Due date</div>
        <div className="">
            <DatePicker dueDate={card.dueDate! as Date} cardId={card.cardId} />
        </div>

        <div className="">Labels</div>
        <div className="">
            <Labels cardLabels={card.labels} cardId={card.cardId} />
        </div>

        <div className="">Completed</div>
        <div className="">Dummy text</div>
    </div>
  )
}

export default ActiveCardHeader
