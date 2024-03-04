import { cn } from '@/lib/utils'
import './checkbox.css'

const CustomCheckbox = ({ complete, color }: { complete: boolean, color: string | null }) => {
  return (
    <label className="checkbox-container">
        <input
            className="custom-checkbox"
            checked={complete}
            type="checkbox"
        />
        <span className="checkmark"></span>
        <span style={{ backgroundColor: complete ? `rgb(${color})` : 'transparent' }}
          className={cn("checkmark",
            // complete ? `bg-[rgb(${color})]` : 'bg-transparent'
          )}></span>
    </label>

  )
}

export default CustomCheckbox