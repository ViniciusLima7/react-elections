import PercentFormatter from './PercentFormatter';

export default function Percentage({ elected = false, children: value }) {
    const colorClass = elected ? 'text-green-700' : 'text-yellow-600';
    return (
        <div className={`text-xl font-semibold ${colorClass}`}>
            <PercentFormatter>{value}</PercentFormatter>
        </div>
    );
}
