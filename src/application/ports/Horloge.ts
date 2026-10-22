// Le temps est une dépendance comme une autre : on l'injecte pour pouvoir le tester.
export interface Horloge {
    maintenant(): Date;
}