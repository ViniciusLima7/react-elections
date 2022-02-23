export default function Avatar({
    imageUrl = './img/superman.png',
    description = 'Descrição do avatar',
}) {
    return (
        <img
            className="rounded-full"
            src={imageUrl}
            alt={description}
            width="70px"
            height="70px"
        />
    );
}
