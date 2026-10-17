# Contributing to Stillpoint

Thank you for your interest in contributing to Stillpoint. This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and considerate in all interactions
- Honor the contemplative nature of the project
- Assume good faith from others
- Focus on what is best for the community
- Show empathy towards other community members

## How to Contribute

### Reporting Issues

If you find a bug or have a suggestion:

1. Check existing issues to avoid duplicates
2. Create a new issue with a clear title and description
3. Include steps to reproduce if reporting a bug
4. Provide relevant context (browser, device, etc.)

### Submitting Content

Stillpoint accepts contributions to its content collection with careful review:

#### Audio Content

Before submitting audio content:

- Verify the content is in the public domain or you have redistribution rights
- Provide complete metadata: title, creator, source, duration, description, tradition, language
- Include attribution notes and rights status
- Specify the type (talk, lecture, satsang, chanting, music, etc.)

#### Library Items

For books, PDFs, or documents:

- Verify you have redistribution rights or link to authorized sources
- Provide complete bibliographic information
- Include author, translator, tradition, language, format
- Specify licensing status where known
- Never assume possession of a PDF equals redistribution rights

#### Journal Articles

Original essays and reflections:

- Topics may include philosophy, consciousness, tradition, and contemporary inquiry
- Distinguish personal reflection from scholarly claims
- Provide sources for quotations and historical references
- Avoid fabricating quotes, facts, or translations
- Note which traditions or perspectives are being presented

### Code Contributions

#### Development Setup

1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `bun install` or `npm install`
4. Start development server: `bun run dev` or `npm run dev`

#### Making Changes

1. Create a branch for your changes: `git checkout -b feature/your-feature-name`
2. Make your changes following existing code style
3. Test your changes thoroughly
4. Commit with clear, descriptive messages
5. Push to your fork
6. Open a pull request

#### Code Style

- Follow existing code conventions
- Use meaningful variable and function names
- Add comments only when necessary
- Keep functions focused and small
- Run linting before committing: `bun run lint` or `npm run lint`

#### Testing

- Test responsive design on different screen sizes
- Verify accessibility (keyboard navigation, screen readers)
- Test on multiple browsers when possible
- Ensure all links work
- Check that media playback functions correctly

## Content Guidelines

### Accuracy and Attribution

- Never fabricate quotations, historical facts, or translations
- Provide sources for claims and references
- Distinguish between primary sources, traditional interpretations, scholarly research, and personal reflection
- Do not present personal interpretation as universal truth
- Honor different philosophical traditions without forcing them into one framework

### Rights and Licensing

- Only distribute content you have explicit permission to redistribute
- For copyrighted material, link to authorized sources
- Do not upload entire collections without verifying rights
- Build an organized ingestion workflow that records provenance and rights
- When in doubt, link rather than host

### Original vs. Curated

- Clearly distinguish original content from curated materials
- Mark embedded external content appropriately
- Specify when content is hosted locally vs. externally
- Respect platform embedding restrictions

## Pull Request Process

1. Update documentation if needed
2. Add tests if appropriate
3. Ensure all tests pass
4. Update the changelog if relevant
5. Submit the pull request with a clear description

## Content Ingestion Workflow

For adding new material to the collection:

1. Verify rights and redistribution status
2. Gather complete metadata (title, author, source, date, format, etc.)
3. Determine if it should be hosted locally or linked externally
4. Add to appropriate data file with proper structure
5. Add cross-references to related materials
6. Test that it displays correctly
7. Update any relevant documentation

## Philosophy

Stillpoint is not a generic content platform. It is:

- A contemplative space
- An editorially curated collection
- A place for serious inquiry
- A bridge between tradition and contemporary understanding
- A project that respects copyright and attribution

Contributions should align with this philosophy.

## Questions?

If you have questions about contributing, please open an issue for discussion before submitting large changes or content additions.

---

Thank you for helping to build Stillpoint.
