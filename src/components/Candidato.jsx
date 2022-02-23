import Avatar from './Avatar';
import Elected from './Eleito';
import NumberFormatter from './NumberFormatter';
import Percentage from './Percentage';

export default function Candidato({
    children: candidateElection,
    presence = 1_000_000,
    elected = false,
}) {
    const { candidate, votes } = candidateElection;

    const imageUrl = `/img/${candidate.username}.png`;
    const percentage = votes / presence;

    return (
        <div className="shadow-lg w-64 h-64 m-2 flex flex-col justify-evenly">
            <div className="flex flex-row items-center justify-between p-4">
                <Avatar imageUrl={imageUrl} description={candidate.name} />

                <div className="flex flex-col items-center">
                    <Percentage elected={elected}>{percentage}</Percentage>

                    <div className="text-sm">
                        <NumberFormatter>{votes}</NumberFormatter> votos
                    </div>
                </div>
            </div>

            <div className="text-2xl text-center">{candidate.name}</div>

            <Elected elected={elected} />
        </div>
    );
}
