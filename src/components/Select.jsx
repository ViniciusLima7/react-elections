import { idServiceGetNewId } from '../services/idService';

const DEFAULT_OPTIONS = [
    { id: 'op1', description: 'Opção 1' },
    { id: 'op2', description: 'Opção 2' },
];

export default function Select({
    id = idServiceGetNewId(),
    labelDescription = 'Título para o <select>',
    selectedValue = DEFAULT_OPTIONS[0],
    onChangeValue = null,
    children: options = DEFAULT_OPTIONS,
}) {
    function handleSelectChange(event) {
        const newValue = event.currentTarget.value;

        if (onChangeValue) {
            onChangeValue(newValue);
        }
    }

    return (
        <div className="flex flex-col items-center">
            <label className='text-lg' htmlFor={id}>{labelDescription}</label>

            <select
                id={id}
                className="m-3 p-2 shadow-lg rounded-lg text-lg"
                value={selectedValue.id}
                onChange={handleSelectChange}
            >
                {options.map(({ id, description }) => {
                    return (
                        <option key={id} value={id}>
                            {description}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
