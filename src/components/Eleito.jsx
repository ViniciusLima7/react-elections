export default function Eleito({ elected = false }) {
    const text = elected ? 'Eleito' : 'Não eleito';

    const colorClass = elected ? 'text-green-900' : 'text-yellow-500';

    return (
        <span className={`text-lg text-center font-semibold ${colorClass}`}>
            {text}
        </span>
    );
}
