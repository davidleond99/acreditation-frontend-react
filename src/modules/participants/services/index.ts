import { BaseCrudService } from '../../../shared/baseCrud';
import customAxiosApp from '../../../shared/axiosConfig';

export class ParticipantsServices extends BaseCrudService {
  constructor() {
    super(customAxiosApp, 'participants');
  }
}

const participantService = new ParticipantsServices();
export default participantService;
