interface AsssitenceRepository {
  getAssistences: (assistenceQuery: AssistenceQuery) => Promise<Assistence[]>;
}
