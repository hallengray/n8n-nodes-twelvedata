# Priority Technical Indicators for Testing - Round 2 (Next 20 Most Important)

**Status:** 33/91 tested (36%), targeting 53/91 (58%) with this round

## Selected Priority Indicators (Round 2 - 20 indicators)

### Momentum Indicators (5) - Complete the Set ⭐⭐⭐
Complete the remaining momentum indicators for comprehensive momentum analysis:

1. **TI-MO-002: ADXR** - Average Directional Movement Index Rating ⭐⭐⭐
   - Complements ADX (already tested)
   - Measures trend strength over longer period
   - Essential for ADX system completion

2. **TI-MO-005: CMO** - Chande Momentum Oscillator ⭐⭐⭐
   - Popular momentum oscillator
   - Alternative to RSI
   - Used for overbought/oversold conditions

3. **TI-MO-006: DX** - Directional Movement Index ⭐⭐
   - Core component of ADX system
   - Measures directional movement
   - Complements ADX and ADXR

4. **TI-MO-010: PPO** - Percentage Price Oscillator ⭐⭐⭐
   - Percentage version of MACD
   - Useful for comparing different price levels
   - Popular momentum indicator

5. **TI-MO-015: TRIX** - Triple Exponential Average ⭐⭐⭐
   - Momentum oscillator
   - Very smooth indicator
   - Popular for trend identification

### Volatility Indicators (2) - Complete the Set ⭐⭐⭐
Complete all volatility indicators:

6. **TI-VO-003: NATR** - Normalized Average True Range ⭐⭐⭐
   - Percentage version of ATR
   - Allows comparison across different price levels
   - Essential volatility tool

7. **TI-VO-005: TRANGE** - True Range ⭐⭐
   - Single period volatility measure
   - Foundation for ATR calculation
   - Useful for intraday analysis

### Volume Indicators (2) - Complete the Set ⭐⭐⭐
Complete all volume indicators:

8. **TI-VL-001: AD** - Accumulation/Distribution ⭐⭐⭐
   - Very popular volume indicator
   - Measures buying/selling pressure
   - Essential volume analysis tool

9. **TI-VL-002: ADOSC** - Chaikin A/D Oscillator ⭐⭐⭐
   - Momentum of A/D line
   - Popular volume oscillator
   - Complements AD indicator

### Trend Indicators (4) - Important Directional Tools ⭐⭐⭐
Key trend indicators for directional analysis:

10. **TI-TR-002: AROONOSC** - Aroon Oscillator ⭐⭐⭐
    - Difference between Aroon Up and Down
    - Popular trend oscillator
    - Complements AROON (already tested)

11. **TI-TR-005: MINUS_DI** - Minus Directional Indicator ⭐⭐⭐
    - Part of ADX system
    - Measures downward trend strength
    - Essential for directional analysis

12. **TI-TR-007: PLUS_DI** - Plus Directional Indicator ⭐⭐⭐
    - Part of ADX system
    - Measures upward trend strength
    - Essential for directional analysis

13. **TI-TR-003: BOP** - Balance of Power ⭐⭐
    - Measures buying/selling pressure
    - Useful trend indicator
    - Popular for market sentiment

### Statistical Functions (3) - Complete Linear Regression Set ⭐⭐
Complete the Linear Regression family:

14. **TI-ST-004: LINEARREG_ANGLE** - Linear Regression Angle ⭐⭐
    - Angle of trend line in degrees
    - Complements LINEARREG (already tested)
    - Useful for trend strength measurement

15. **TI-ST-006: LINEARREG_SLOPE** - Linear Regression Slope ⭐⭐
    - Slope of trend line
    - Complements LINEARREG (already tested)
    - Measures trend rate of change

16. **TI-ST-008: TSF** - Time Series Forecast ⭐⭐⭐
    - Linear regression projection
    - Popular forecasting tool
    - Used for price prediction

### Overlap Studies (3) - Essential Price Calculations ⭐⭐
Important price calculation methods:

17. **TI-OV-001: AVGPRICE** - Average Price ⭐⭐⭐
    - Average of OHLC prices
    - Very commonly used
    - Foundation for many calculations

18. **TI-OV-007: MEDPRICE** - Median Price ⭐⭐⭐
    - (High + Low) / 2
    - Popular price reference
    - Used in many trading systems

19. **TI-OV-012: TYPPRICE** - Typical Price ⭐⭐⭐
    - (High + Low + Close) / 3
    - Most common price calculation
    - Essential for technical analysis

### Math Transform (1) - Essential Statistical Functions ⭐⭐
Important statistical calculations:

20. **TI-MT-013: MAX** - Maximum Value ⭐⭐⭐
    - Highest value over period
    - Essential statistical function
    - Used in many trading strategies

**Note:** We're including MAX as a representative of the MIN/MAX/SUM group, which are fundamental statistical functions used across many indicators.

---

## Testing Order (Recommended)

**Phase 1 - Complete Core Sets (Test First):** 
1. TI-VL-001: AD ✅ (Volume - very popular)
2. TI-VL-002: ADOSC ✅ (Volume - complements AD)
3. TI-VO-003: NATR ✅ (Volatility - percentage ATR)
4. TI-VO-005: TRANGE ✅ (Volatility - completes set)
5. TI-MO-002: ADXR ✅ (Momentum - complements ADX)
6. TI-MO-005: CMO ✅ (Momentum - popular oscillator)
7. TI-MO-010: PPO ✅ (Momentum - percentage MACD)
8. TI-MO-015: TRIX ✅ (Momentum - smooth oscillator)

**Phase 2 - ADX System Components:**
9. TI-MO-006: DX ✅ (Momentum - ADX component)
10. TI-TR-005: MINUS_DI ✅ (Trend - ADX component)
11. TI-TR-007: PLUS_DI ✅ (Trend - ADX component)

**Phase 3 - Important Indicators:**
12. TI-TR-002: AROONOSC ✅ (Trend - complements AROON)
13. TI-TR-003: BOP ✅ (Trend - buying/selling pressure)
14. TI-ST-008: TSF ✅ (Statistical - forecasting)
15. TI-OV-001: AVGPRICE ✅ (Overlap - essential price calc)
16. TI-OV-007: MEDPRICE ✅ (Overlap - popular price ref)
17. TI-OV-012: TYPPRICE ✅ (Overlap - most common calc)
18. TI-MT-013: MAX ✅ (Math Transform - essential stat)

**Phase 4 - Complete Linear Regression:**
19. TI-ST-004: LINEARREG_ANGLE ✅ (Statistical - LR angle)
20. TI-ST-006: LINEARREG_SLOPE ✅ (Statistical - LR slope)

---

## Summary by Category

- **Momentum Indicators:** 5 indicators (completes momentum set - 17/17 total)
- **Volatility Indicators:** 2 indicators (completes volatility set - 5/5 total)
- **Volume Indicators:** 2 indicators (completes volume set - 4/4 total)
- **Trend Indicators:** 4 indicators (expands trend coverage - 6/10 total)
- **Statistical Functions:** 3 indicators (expands statistical coverage - 5/9 total)
- **Overlap Studies:** 3 indicators (expands overlap coverage - 4/14 total)
- **Math Transform:** 1 indicator (expands math transform - 2/25 total)

**Total:** 20 indicators

---

## Rationale

These 20 indicators were selected because they:

1. **Complete Core Sets:** Finish momentum (17/17), volatility (5/5), and volume (4/4) categories
2. **Complete ADX System:** Add ADXR, DX, PLUS_DI, MINUS_DI to complement tested ADX
3. **Complete Linear Regression:** Add ANGLE and SLOPE to complement tested LINEARREG
4. **Essential Price Calculations:** AVGPRICE, MEDPRICE, TYPPRICE are fundamental
5. **Popular Indicators:** CMO, PPO, TRIX, AD, ADOSC are widely used
6. **Practical Utility:** All indicators have real-world trading applications

**Current Progress:** 33/91 indicators tested (36%)

**After This Round:** 53/91 indicators tested (58%) - approaching 70% goal

**Remaining After Round 2:** 38 indicators (42%) - mostly advanced/niche indicators

---

## Expected Coverage After Round 2

- **Moving Averages:** 9/9 (100%) ✅ COMPLETE
- **Momentum Indicators:** 17/17 (100%) ✅ COMPLETE
- **Volatility Indicators:** 5/5 (100%) ✅ COMPLETE
- **Volume Indicators:** 4/4 (100%) ✅ COMPLETE
- **Trend Indicators:** 6/10 (60%)
- **Statistical Functions:** 5/9 (56%)
- **Overlap Studies:** 4/14 (29%)
- **Math Transform:** 2/25 (8%)

**Overall:** 53/91 (58%) - Strong coverage of all core indicator categories
