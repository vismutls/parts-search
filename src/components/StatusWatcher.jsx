import { Loader } from './Loader';
import { Message } from './Message';

export function StatusWatcher({ entity }) {
    if (entity.status === 'idle') return null;
    if (entity.status === 'loading') return <Loader />;
    if (entity.status === 'error') return <Message type="danger">{entity.error}</Message>;
}

export function isStatusDone(entity) {
    return entity.status === 'done';
}