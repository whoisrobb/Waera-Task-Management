import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "react-router-dom";

const BoardFilters = () => {
    const DEFAULT_FILTERS = {
        order: "",
    };
  
    const [searchParams, setSearchParams] = useSearchParams(DEFAULT_FILTERS);
    searchParams.get("order");
    // const orderBy = searchParams.get("orderBy");

    const handleOrder = (value: string) => {
      setSearchParams(prev => {
        prev.set("order", value)
        return prev
      })
    }
    const handleOrderBy = (value: string) => {
      setSearchParams(prev => {
        prev.set("order", value)
        return prev
      })
    }
  return (
    <div className="flex gap-2">
        <Select
            onValueChange={handleOrder}
        >
            <SelectTrigger className="">
                <SelectValue placeholder="Filter:" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
        </Select>

        <Select
            onValueChange={handleOrderBy}
        >
            <SelectTrigger className="">
                <SelectValue placeholder="Order by:" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="position">Position</SelectItem>
                <SelectItem value="date">Date</SelectItem>
            </SelectContent>
        </Select>
    </div>
  )
}

export default BoardFilters
