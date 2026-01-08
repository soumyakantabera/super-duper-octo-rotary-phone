import type { Snippet, SnippetCategory } from '../../types/snippet';
import { SnippetCategory as SC } from '../../types/snippet';

export const snippets: Snippet[] = [
  // Fractions & Roots
  {
    id: 'frac-basic',
    label: 'Fraction',
    category: SC.FRACTIONS,
    latex: '\\frac{a}{b}',
    keywords: ['fraction', 'divide', 'ratio'],
  },
  {
    id: 'dfrac',
    label: 'Display Fraction',
    category: SC.FRACTIONS,
    latex: '\\dfrac{a}{b}',
    keywords: ['fraction', 'display', 'large'],
  },
  {
    id: 'tfrac',
    label: 'Text Fraction',
    category: SC.FRACTIONS,
    latex: '\\tfrac{a}{b}',
    keywords: ['fraction', 'text', 'small'],
  },
  {
    id: 'sqrt',
    label: 'Square Root',
    category: SC.FRACTIONS,
    latex: '\\sqrt{x}',
    keywords: ['root', 'square', 'radical'],
  },
  {
    id: 'nthroot',
    label: 'Nth Root',
    category: SC.FRACTIONS,
    latex: '\\sqrt[n]{x}',
    keywords: ['root', 'nth', 'radical'],
  },

  // Subscripts & Superscripts
  {
    id: 'superscript',
    label: 'Superscript',
    category: SC.SUBSCRIPTS,
    latex: 'x^2',
    keywords: ['power', 'exponent', 'superscript'],
  },
  {
    id: 'subscript',
    label: 'Subscript',
    category: SC.SUBSCRIPTS,
    latex: 'x_i',
    keywords: ['index', 'subscript'],
  },
  {
    id: 'sub-super',
    label: 'Sub & Superscript',
    category: SC.SUBSCRIPTS,
    latex: 'x_i^n',
    keywords: ['subscript', 'superscript', 'index', 'power'],
  },

  // Brackets
  {
    id: 'paren',
    label: 'Parentheses',
    category: SC.BRACKETS,
    latex: '\\left( \\right)',
    keywords: ['parentheses', 'brackets', 'delimiters'],
  },
  {
    id: 'square-brackets',
    label: 'Square Brackets',
    category: SC.BRACKETS,
    latex: '\\left[ \\right]',
    keywords: ['brackets', 'square', 'delimiters'],
  },
  {
    id: 'curly-braces',
    label: 'Curly Braces',
    category: SC.BRACKETS,
    latex: '\\left\\{ \\right\\}',
    keywords: ['braces', 'curly', 'set'],
  },
  {
    id: 'absolute',
    label: 'Absolute Value',
    category: SC.BRACKETS,
    latex: '\\lvert x \\rvert',
    keywords: ['absolute', 'value', 'bars'],
  },
  {
    id: 'norm',
    label: 'Norm',
    category: SC.BRACKETS,
    latex: '\\lVert x \\rVert',
    keywords: ['norm', 'magnitude', 'double bars'],
  },

  // Matrices
  {
    id: 'bmatrix-2x2',
    label: '2×2 Matrix (brackets)',
    category: SC.MATRICES,
    latex: '\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}',
    keywords: ['matrix', 'brackets', '2x2'],
  },
  {
    id: 'pmatrix-2x2',
    label: '2×2 Matrix (parentheses)',
    category: SC.MATRICES,
    latex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}',
    keywords: ['matrix', 'parentheses', '2x2'],
  },
  {
    id: 'vmatrix',
    label: 'Determinant',
    category: SC.MATRICES,
    latex: '\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}',
    keywords: ['determinant', 'matrix', 'bars'],
  },
  {
    id: 'vector',
    label: 'Vector',
    category: SC.MATRICES,
    latex: '\\vec{v}',
    keywords: ['vector', 'arrow'],
  },
  {
    id: 'bold-vector',
    label: 'Bold Vector',
    category: SC.MATRICES,
    latex: '\\mathbf{v}',
    keywords: ['vector', 'bold'],
  },

  // Operators
  {
    id: 'sum',
    label: 'Summation',
    category: SC.OPERATORS,
    latex: '\\sum_{i=1}^n',
    keywords: ['sum', 'summation', 'sigma'],
  },
  {
    id: 'prod',
    label: 'Product',
    category: SC.OPERATORS,
    latex: '\\prod_{i=1}^n',
    keywords: ['product', 'multiplication', 'pi'],
  },
  {
    id: 'integral',
    label: 'Integral',
    category: SC.OPERATORS,
    latex: '\\int_a^b',
    keywords: ['integral', 'integration'],
  },
  {
    id: 'limit',
    label: 'Limit',
    category: SC.OPERATORS,
    latex: '\\lim_{x \\to 0}',
    keywords: ['limit', 'approach'],
  },
  {
    id: 'log',
    label: 'Logarithm',
    category: SC.OPERATORS,
    latex: '\\log',
    keywords: ['log', 'logarithm'],
  },
  {
    id: 'ln',
    label: 'Natural Log',
    category: SC.OPERATORS,
    latex: '\\ln',
    keywords: ['ln', 'natural', 'logarithm'],
  },

  // Greek Letters
  {
    id: 'alpha',
    label: 'Alpha',
    category: SC.GREEK,
    latex: '\\alpha',
    keywords: ['alpha', 'greek'],
  },
  {
    id: 'beta',
    label: 'Beta',
    category: SC.GREEK,
    latex: '\\beta',
    keywords: ['beta', 'greek'],
  },
  {
    id: 'gamma',
    label: 'Gamma',
    category: SC.GREEK,
    latex: '\\gamma',
    keywords: ['gamma', 'greek'],
  },
  {
    id: 'delta',
    label: 'Delta',
    category: SC.GREEK,
    latex: '\\delta',
    keywords: ['delta', 'greek'],
  },
  {
    id: 'epsilon',
    label: 'Epsilon',
    category: SC.GREEK,
    latex: '\\epsilon',
    keywords: ['epsilon', 'greek'],
  },
  {
    id: 'theta',
    label: 'Theta',
    category: SC.GREEK,
    latex: '\\theta',
    keywords: ['theta', 'greek'],
  },
  {
    id: 'lambda',
    label: 'Lambda',
    category: SC.GREEK,
    latex: '\\lambda',
    keywords: ['lambda', 'greek'],
  },
  {
    id: 'mu',
    label: 'Mu',
    category: SC.GREEK,
    latex: '\\mu',
    keywords: ['mu', 'greek'],
  },
  {
    id: 'pi',
    label: 'Pi',
    category: SC.GREEK,
    latex: '\\pi',
    keywords: ['pi', 'greek'],
  },
  {
    id: 'sigma',
    label: 'Sigma',
    category: SC.GREEK,
    latex: '\\sigma',
    keywords: ['sigma', 'greek'],
  },
  {
    id: 'phi',
    label: 'Phi',
    category: SC.GREEK,
    latex: '\\phi',
    keywords: ['phi', 'greek'],
  },
  {
    id: 'omega',
    label: 'Omega',
    category: SC.GREEK,
    latex: '\\omega',
    keywords: ['omega', 'greek'],
  },

  // Sets & Logic
  {
    id: 'in',
    label: 'Element Of',
    category: SC.SETS,
    latex: '\\in',
    keywords: ['in', 'element', 'member'],
  },
  {
    id: 'notin',
    label: 'Not Element Of',
    category: SC.SETS,
    latex: '\\notin',
    keywords: ['not', 'element', 'member'],
  },
  {
    id: 'subset',
    label: 'Subset',
    category: SC.SETS,
    latex: '\\subset',
    keywords: ['subset', 'contained'],
  },
  {
    id: 'subseteq',
    label: 'Subset or Equal',
    category: SC.SETS,
    latex: '\\subseteq',
    keywords: ['subset', 'equal', 'contained'],
  },
  {
    id: 'union',
    label: 'Union',
    category: SC.SETS,
    latex: '\\cup',
    keywords: ['union', 'or', 'set'],
  },
  {
    id: 'intersection',
    label: 'Intersection',
    category: SC.SETS,
    latex: '\\cap',
    keywords: ['intersection', 'and', 'set'],
  },
  {
    id: 'forall',
    label: 'For All',
    category: SC.SETS,
    latex: '\\forall',
    keywords: ['forall', 'all', 'universal'],
  },
  {
    id: 'exists',
    label: 'Exists',
    category: SC.SETS,
    latex: '\\exists',
    keywords: ['exists', 'existential'],
  },
  {
    id: 'implies',
    label: 'Implies',
    category: SC.SETS,
    latex: '\\Rightarrow',
    keywords: ['implies', 'arrow', 'logic'],
  },
  {
    id: 'iff',
    label: 'If and Only If',
    category: SC.SETS,
    latex: '\\Leftrightarrow',
    keywords: ['iff', 'equivalent', 'logic'],
  },
  {
    id: 'reals',
    label: 'Real Numbers',
    category: SC.SETS,
    latex: '\\mathbb{R}',
    keywords: ['real', 'numbers', 'R'],
  },
  {
    id: 'naturals',
    label: 'Natural Numbers',
    category: SC.SETS,
    latex: '\\mathbb{N}',
    keywords: ['natural', 'numbers', 'N'],
  },
  {
    id: 'integers',
    label: 'Integers',
    category: SC.SETS,
    latex: '\\mathbb{Z}',
    keywords: ['integers', 'numbers', 'Z'],
  },

  // Calculus
  {
    id: 'derivative',
    label: 'Derivative',
    category: SC.CALCULUS,
    latex: '\\frac{d}{dx}',
    keywords: ['derivative', 'differentiation'],
  },
  {
    id: 'partial',
    label: 'Partial Derivative',
    category: SC.CALCULUS,
    latex: '\\frac{\\partial}{\\partial x}',
    keywords: ['partial', 'derivative'],
  },
  {
    id: 'nabla',
    label: 'Gradient',
    category: SC.CALCULUS,
    latex: '\\nabla',
    keywords: ['gradient', 'nabla', 'del'],
  },
  {
    id: 'laplacian',
    label: 'Laplacian',
    category: SC.CALCULUS,
    latex: '\\Delta',
    keywords: ['laplacian', 'delta'],
  },

  // Probability
  {
    id: 'expectation',
    label: 'Expectation',
    category: SC.PROBABILITY,
    latex: '\\mathbb{E}[X]',
    keywords: ['expectation', 'expected', 'value', 'mean'],
  },
  {
    id: 'variance',
    label: 'Variance',
    category: SC.PROBABILITY,
    latex: '\\mathrm{Var}(X)',
    keywords: ['variance', 'var'],
  },
  {
    id: 'covariance',
    label: 'Covariance',
    category: SC.PROBABILITY,
    latex: '\\mathrm{Cov}(X,Y)',
    keywords: ['covariance', 'cov'],
  },
  {
    id: 'normal',
    label: 'Normal Distribution',
    category: SC.PROBABILITY,
    latex: '\\mathcal{N}(\\mu, \\sigma^2)',
    keywords: ['normal', 'gaussian', 'distribution'],
  },
  {
    id: 'conditional',
    label: 'Conditional Probability',
    category: SC.PROBABILITY,
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
