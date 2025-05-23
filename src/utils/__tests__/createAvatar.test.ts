import { createAvatar, getFirstCharacter, getAvatarColor } from '../createAvatar';

describe('createAvatar utils', () => {
  describe('getFirstCharacter', () => {
    it('should return the first character in uppercase', () => {
      expect(getFirstCharacter('John Doe')).toBe('J');
    });

    it('should return an empty string for an empty input string', () => {
      expect(getFirstCharacter('')).toBe('');
    });

    it('should return the first character in uppercase even if it is lowercase initially', () => {
      expect(getFirstCharacter('jane Doe')).toBe('J');
    });

    it('should handle names with leading numbers', () => {
      expect(getFirstCharacter('9lives')).toBe('9');
    });
  });

  describe('getAvatarColor', () => {
    // Test PRIMARY_NAME
    it('should return "primary" for names starting with A, N, H, L, Q, 9, 8', () => {
      ['Alice', 'Noah', 'Henry', 'Liam', 'Quinn', '9tales', '8ball'].forEach(name => {
        expect(getAvatarColor(name)).toBe('primary');
      });
    });

    // Test INFO_NAME
    it('should return "info" for names starting with F, G, T, I, J, 1, 2, 3', () => {
      ['Fiona', 'George', 'Tom', 'Ivy', 'Jack', '1direction', '2fast', '3musketeers'].forEach(name => {
        expect(getAvatarColor(name)).toBe('info');
      });
    });

    // Test SUCCESS_NAME
    it('should return "success" for names starting with K, D, Y, B, O, 4, 5', () => {
      ['Kate', 'David', 'Yara', 'Bob', 'Olivia', '4seasons', '5stars'].forEach(name => {
        expect(getAvatarColor(name)).toBe('success');
      });
    });

    // Test WARNING_NAME
    it('should return "warning" for names starting with P, E, R, S, C, U, 6, 7', () => {
      ['Peter', 'Emma', 'Rachel', 'Sam', 'Chris', 'Ursula', '6sense', '7heaven'].forEach(name => {
        expect(getAvatarColor(name)).toBe('warning');
      });
    });

    // Test ERROR_NAME
    it('should return "error" for names starting with V, W, X, M, Z', () => {
      ['Victor', 'Wendy', 'Xavier', 'Mary', 'Zoe'].forEach(name => {
        expect(getAvatarColor(name)).toBe('error');
      });
    });

    it('should return "warning" for a name starting with "U" (in WARNING_NAME)', () => {
      expect(getAvatarColor('Unknown')).toBe('warning'); 
    });

    it('should return "primary" for names whose first character is not in any defined category list', () => {
      // The current lists cover all english alphabet letters A-Z and numbers 1-9.
      // Test with a special character.
      expect(getAvatarColor('!Special')).toBe('primary');
      expect(getAvatarColor('@Another')).toBe('primary');
    });

    it('should return "primary" for an empty string input', () => {
      // getFirstCharacter('') returns ''.
      // ''.includes('') is true. So PRIMARY_NAME.includes('') would be true if '' was in PRIMARY_NAME.
      // Since '' is not in any of the lists, it defaults to "primary".
      expect(getAvatarColor('')).toBe('primary');
    });
  });

  describe('createAvatar', () => {
    it('should return correct avatar props for a known name (primary)', () => {
      const result = createAvatar('Alice');
      expect(result).toEqual({ name: 'A', color: 'primary' });
    });

    it('should return correct avatar props for a known name (info)', () => {
      const result = createAvatar('Fiona');
      expect(result).toEqual({ name: 'F', color: 'info' });
    });
    
    it('should return correct avatar props for a known name (success)', () => {
      const result = createAvatar('Kate');
      expect(result).toEqual({ name: 'K', color: 'success' });
    });

    it('should return correct avatar props for a known name (warning)', () => {
      const result = createAvatar('Peter');
      expect(result).toEqual({ name: 'P', color: 'warning' });
    });

    it('should return correct avatar props for a known name (error)', () => {
      const result = createAvatar('Victor');
      expect(result).toEqual({ name: 'V', color: 'error' });
    });

    it('should return correct avatar props for a name starting with a number (primary)', () => {
      const result = createAvatar('9tales');
      expect(result).toEqual({ name: '9', color: 'primary' });
    });
    
    it('should return correct avatar props for a name starting with a number (info)', () => {
      const result = createAvatar('1direction');
      expect(result).toEqual({ name: '1', color: 'info' });
    });

    it('should default to primary color for a name not in any category', () => {
      // Assuming '!' is not in any list and getFirstCharacter returns '!'
      const result = createAvatar('!SpecialCharacter');
      expect(result).toEqual({ name: '!', color: 'primary' });
    });

    it('should return empty name and primary color for an empty input string', () => {
      const result = createAvatar('');
      expect(result).toEqual({ name: '', color: 'primary' });
    });
  });
});
