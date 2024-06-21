import { handleUpdateCard } from '@/api/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useBoardStore } from '@/providers/board-provider';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

const DatePicker = ({ dueDate, cardId }: { dueDate: Date, cardId: string }) => {
    const { fetchData } = useBoardStore();
    const [date, setDate] = useState<Date | undefined>(dueDate);

    const updateDate = async () => {
        await handleUpdateCard({ valueId: cardId, dueDate: date })
        fetchData();
    }

    useEffect(() => {
        updateDate()
    }, [date])
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
            variant={'outline'}
            className={cn(
                'w-[280px] justify-start text-left font-normal space-x-2',
                !date && 'text-muted-foreground'
            )}
        >
            <CalendarIcon />
            <div className="">
                {date ? format(date, "PPP"): <span>Pick a date</span>}
            </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
            mode='single'
            selected={date}
            onSelect={setDate}
            initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker;