const formatter = Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export default function PercentFormatter({ children: value }) {
    return <span>{formatter.format(value)}</span>;
}
