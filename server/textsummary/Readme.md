# NLP: Text Summarization

This code focuses on extractive summarization, where the most important sentences are selected from the original text to form the summary.

## How It Works

- Text Definition: The code starts by defining a long paragraph of text to be summarized.
- Library Imports: Necessary libraries such as spaCy and others are imported.
- Model Loading: The spaCy model is loaded for processing the text.
- Text Processing: The text is tokenized into words and sentences, and stop words and punctuation are filtered out.
- Word Frequency Calculation: The frequency of each word in the text is calculated and normalized.
- Sentence Scoring: Each sentence is scored based on the frequency of the words it contains.
- Summary Generation: The top-scoring sentences are selected to form the summary.
- Comparison: The lengths of the original and summarized texts are compared.
