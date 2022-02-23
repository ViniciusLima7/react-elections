const formatter = Intl.NumberFormat('pt-BR');

export default function NumberFormatter({ children: value }) {
    return <span>{formatter.format(value)}</span>;
}
