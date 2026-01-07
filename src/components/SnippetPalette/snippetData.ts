import { Snippet, SnippetCategory } from '../../types/snippet';

export const snippets: Snippet[] = [
  // Fractions & Roots
  {
    id: 'frac-basic',
    label: 'Fraction',
    category: SnippetCategory.FRACTIONS,
    latex: '\\frac{a}{b}',
    keywords: ['fraction', 'divide', 'ratio'],
  },
  {
    id: 'dfrac',
    label: 'Display Fraction',
    category: SnippetCategory.FRACTIONS,
    latex: '\\dfrac{a}{b}',
    keywords: ['fraction', 'display', 'large'],
  },
  {
    id: 'tfrac',
    label: 'Text Fraction',
    category: SnippetCategory.FRACTIONS,
    latex: '\\tfrac{a}{b}',
    keywords: ['fraction', 'text', 'small'],
  },
  {
    id: 'sqrt',
    label: 'Square Root',
    category: SnippetCategory.FRACTIONS,
    latex: '\\sqrt{x}',
    keywords: ['root', 'square', 'radical'],
  },
  {
    id: 'nthroot',
    label: 'Nth Root',
    category: SnippetCategory.FRACTIONS,
    latex: '\\sqrt[n]{x}',
    keywords: ['root', 'nth', 'radical'],
  },

  // Subscripts & Superscripts
  {
    id: 'superscript',
    label: 'Superscript',
    category: SnippetCategory.SUBSCRIPTS,
    latex: 'x^2',
    keywords: ['power', 'exponent', 'superscript'],
  },
  {
    id: 'subscript',
    label: 'Subscript',
    category: SnippetCategory.SUBSCRIPTS,
    latex: 'x_i',
    keywords: ['index', 'subscript'],
  },
  {
    id: 'sub-super',
    label: 'Sub & Superscript',
    category: SnippetCategory.SUBSCRIPTS,
    latex: 'x_i^n',
    keywords: ['subscript', 'superscript', 'index', 'power'],
  },

  // Brackets
  {
    id: 'paren',
    label: 'Parentheses',
    category: SnippetCategory.BRACKETS,
    latex: '\\left( \\right)',
    keywords: ['parentheses', 'brackets', 'delimiters'],
  },
  {
    id: 'square-brackets',
    label: 'Square Brackets',
    category: SnippetCategory.BRACKETS,
    latex: '\\left[ \\right]',
    keywords: ['brackets', 'square', 'delimiters'],
  },
  {
    id: 'curly-braces',
    label: 'Curly Braces',
    category: SnippetCategory.BRACKETS,
    latex: '\\left\\{ \\right\\}',
    keywords: ['braces', 'curly', 'set'],
  },
  {
    id: 'absolute',
    label: 'Absolute Value',
    category: SnippetCategory.BRACKETS,
    latex: '\\lvert x \\rvert',
    keywords: ['absolute', 'value', 'bars'],
  },
  {
    id: 'norm',
    label: 'Norm',
    category: SnippetCategory.BRACKETS,
    latex: '\\lVert x \\rVert',
    keywords: ['norm', 'magnitude', 'double bars'],
  },

  // Matrices
  {
    id: 'bmatrix-2x2',
    label: '2×2 Matrix (brackets)',
    category: SnippetCategory.MATRICES,
    latex: '\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}',
    keywords: ['matrix', 'brackets', '2x2'],
  },
  {
    id: 'pmatrix-2x2',
    label: '2×2 Matrix (parentheses)',
    category: SnippetCategory.MATRICES,
    latex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}',
    keywords: ['matrix', 'parentheses', '2x2'],
  },
  {
    id: 'vmatrix',
    label: 'Determinant',
    category: SnippetCategory.MATRICES,
    latex: '\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}',
    keywords: ['determinant', 'matrix', 'bars'],
  },
  {
    id: 'vector',
    label: 'Vector',
    category: SnippetCategory.MATRICES,
    latex: '\\vec{v}',
    keywords: ['vector', 'arrow'],
  },
  {
    id: 'bold-vector',
    label: 'Bold Vector',
    category: SnippetCategory.MATRICES,
    latex: '\\mathbf{v}',
    keywords: ['vector', 'bold'],
  },

  // Operators
  {
    id: 'sum',
    label: 'Summation',
    category: SnippetCategory.OPERATORS,
    latex: '\\sum_{i=1}^n',
    keywords: ['sum', 'summation', 'sigma'],
  },
  {
    id: 'prod',
    label: 'Product',
    category: SnippetCategory.OPERATORS,
    latex: '\\prod_{i=1}^n',
    keywords: ['product', 'multiplication', 'pi'],
  },
  {
    id: 'integral',
    label: 'Integral',
    category: SnippetCategory.OPERATORS,
    latex: '\\int_a^b',
    keywords: ['integral', 'integration'],
  },
  {
    id: 'limit',
    label: 'Limit',
    category: SnippetCategory.OPERATORS,
    latex: '\\lim_{x \\to 0}',
    keywords: ['limit', 'approach'],
  },
  {
    id: 'log',
    label: 'Logarithm',
    category: SnippetCategory.OPERATORS,
    latex: '\\log',
    keywords: ['log', 'logarithm'],
  },
  {
    id: 'ln',
    label: 'Natural Log',
    category: SnippetCategory.OPERATORS,
    latex: '\\ln',
    keywords: ['ln', 'natural', 'logarithm'],
  },

  // Greek Letters
  {
    id: 'alpha',
    label: 'Alpha',
    category: SnippetCategory.GREEK,
    latex: '\\alpha',
    keywords: ['alpha', 'greek'],
  },
  {
    id: 'beta',
    label: 'Beta',
    category: SnippetCategory.GREEK,
    latex: '\\beta',
    keywords: ['beta', 'greek'],
  },
  {
    id: 'gamma',
    label: 'Gamma',
    category: SnippetCategory.GREEK,
    latex: '\\gamma',
    keywords: ['gamma', 'greek'],
  },
  {
    id: 'delta',
    label: 'Delta',
    category: SnippetCategory.GREEK,
    latex: '\\delta',
    keywords: ['delta', 'greek'],
  },
  {
    id: 'epsilon',
    label: 'Epsilon',
    category: SnippetCategory.GREEK,
    latex: '\\epsilon',
    keywords: ['epsilon', 'greek'],
  },
  {
    id: 'theta',
    label: 'Theta',
    category: SnippetCategory.GREEK,
    latex: '\\theta',
    keywords: ['theta', 'greek'],
  },
  {
    id: 'lambda',
    label: 'Lambda',
    category: SnippetCategory.GREEK,
    latex: '\\lambda',
    keywords: ['lambda', 'greek'],
  },
  {
    id: 'mu',
    label: 'Mu',
    category: SnippetCategory.GREEK,
    latex: '\\mu',
    keywords: ['mu', 'greek'],
  },
  {
    id: 'pi',
    label: 'Pi',
    category: SnippetCategory.GREEK,
    latex: '\\pi',
    keywords: ['pi', 'greek'],
  },
  {
    id: 'sigma',
    label: 'Sigma',
    category: SnippetCategory.GREEK,
    latex: '\\sigma',
    keywords: ['sigma', 'greek'],
  },
  {
    id: 'phi',
    label: 'Phi',
    category: SnippetCategory.GREEK,
    latex: '\\phi',
    keywords: ['phi', 'greek'],
  },
  {
    id: 'omega',
    label: 'Omega',
    category: SnippetCategory.GREEK,
    latex: '\\omega',
    keywords: ['omega', 'greek'],
  },

  // Sets & Logic
  {
    id: 'in',
    label: 'Element Of',
    category: SnippetCategory.SETS,
    latex: '\\in',
    keywords: ['in', 'element', 'member'],
  },
  {
    id: 'notin',
    label: 'Not Element Of',
    category: SnippetCategory.SETS,
    latex: '\\notin',
    keywords: ['not', 'element', 'member'],
  },
  {
    id: 'subset',
    label: 'Subset',
    category: SnippetCategory.SETS,
    latex: '\\subset',
    keywords: ['subset', 'contained'],
  },
  {
    id: 'subseteq',
    label: 'Subset or Equal',
    category: SnippetCategory.SETS,
    latex: '\\subseteq',
    keywords: ['subset', 'equal', 'contained'],
  },
  {
    id: 'union',
    label: 'Union',
    category: SnippetCategory.SETS,
    latex: '\\cup',
    keywords: ['union', 'or', 'set'],
  },
  {
    id: 'intersection',
    label: 'Intersection',
    category: SnippetCategory.SETS,
    latex: '\\cap',
    keywords: ['intersection', 'and', 'set'],
  },
  {
    id: 'forall',
    label: 'For All',
    category: SnippetCategory.SETS,
    latex: '\\forall',
    keywords: ['forall', 'all', 'universal'],
  },
  {
    id: 'exists',
    label: 'Exists',
    category: SnippetCategory.SETS,
    latex: '\\exists',
    keywords: ['exists', 'existential'],
  },
  {
    id: 'implies',
    label: 'Implies',
    category: SnippetCategory.SETS,
    latex: '\\Rightarrow',
    keywords: ['implies', 'arrow', 'logic'],
  },
  {
    id: 'iff',
    label: 'If and Only If',
    category: SnippetCategory.SETS,
    latex: '\\Leftrightarrow',
    keywords: ['iff', 'equivalent', 'logic'],
  },
  {
    id: 'reals',
    label: 'Real Numbers',
    category: SnippetCategory.SETS,
    latex: '\\mathbb{R}',
    keywords: ['real', 'numbers', 'R'],
  },
  {
    id: 'naturals',
    label: 'Natural Numbers',
    category: SnippetCategory.SETS,
    latex: '\\mathbb{N}',
    keywords: ['natural', 'numbers', 'N'],
  },
  {
    id: 'integers',
    label: 'Integers',
    category: SnippetCategory.SETS,
    latex: '\\mathbb{Z}',
    keywords: ['integers', 'numbers', 'Z'],
  },

  // Calculus
  {
    id: 'derivative',
    label: 'Derivative',
    category: SnippetCategory.CALCULUS,
    latex: '\\frac{d}{dx}',
    keywords: ['derivative', 'differentiation'],
  },
  {
    id: 'partial',
    label: 'Partial Derivative',
    category: SnippetCategory.CALCULUS,
    latex: '\\frac{\\partial}{\\partial x}',
    keywords: ['partial', 'derivative'],
  },
  {
    id: 'nabla',
    label: 'Gradient',
    category: SnippetCategory.CALCULUS,
    latex: '\\nabla',
    keywords: ['gradient', 'nabla', 'del'],
  },
  {
    id: 'laplacian',
    label: 'Laplacian',
    category: SnippetCategory.CALCULUS,
    latex: '\\Delta',
    keywords: ['laplacian', 'delta'],
  },

  // Probability
  {
    id: 'expectation',
    label: 'Expectation',
    category: SnippetCategory.PROBABILITY,
    latex: '\\mathbb{E}[X]',
    keywords: ['expectation', 'expected', 'value', 'mean'],
  },
  {
    id: 'variance',
    label: 'Variance',
    category: SnippetCategory.PROBABILITY,
    latex: '\\mathrm{Var}(X)',
    keywords: ['variance', 'var'],
  },
  {
    id: 'covariance',
    label: 'Covariance',
    category: SnippetCategory.PROBABILITY,
    latex: '\\mathrm{Cov}(X,Y)',
    keywords: ['covariance', 'cov'],
  },
  {
    id: 'normal',
    label: 'Normal Distribution',
    category: SnippetCategory.PROBABILITY,
    latex: '\\mathcal{N}(\\mu, \\sigma^2)',
    keywords: ['normal', 'gaussian', 'distribution'],
  },
  {
    id: 'conditional',
    label: 'Conditional Probability',
    category: SnippetCategory.PROBABILITY,
    latex: 'P(A \\mid B)',
    keywords: ['conditional', 'probability', 'given'],
  },
];

export function getSnippetsByCategory(category: SnippetCategory): Snippet[] {
  return snippets.filter(s => s.category === category);
}

export function searchSnippets(query: string): Snippet[] {
  const lowerQuery = query.toLowerCase();
  return snippets.filter(s => 
    s.label.toLowerCase().includes(lowerQuery) ||
    s.keywords.some(k => k.toLowerCase().includes(lowerQuery))
  );
}
