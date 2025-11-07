import { useEffect } from 'react';

type Props = {
	task: string;
	open: boolean;
	onClose: () => void;
};

export const Notifier = ({ task, open, onClose }: Props) => {
	useEffect(() => {
		let timerId: NodeJS.Timeout;

		if (open) {
			timerId = setTimeout(() => {
				onClose();
			}, 2000);
		}

		return () => clearTimeout(timerId);
	}, [open]);

	if (!open) {
		return null;
	}

	return (
		<div aria-label='notification' className='blackout'>
			<div aria-label='notification-text' className='notifier-wrapper'>
				{task}
			</div>
		</div>
	);
};
