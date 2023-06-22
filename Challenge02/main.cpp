#include <iostream>
#include <vector>

using namespace std;

vector<int> findDuplicates(vector<int>& arr) {
    int N = arr.size();
    vector<int> freq(N, 0); // Frequency vector of size N

    // Count frequencies of elements in the array
    for (int i = 0; i < N; i++) {
        freq[arr[i]]++;
    }

    // Find elements occurring more than once
    vector<int> duplicates;
    for (int i = 0; i < N; i++) {
        if (freq[i] > 1) {
            duplicates.push_back(i);
        }
    }

    return duplicates;
}

int main() {
    vector<int> arr = {2, 3, 1, 2, 3};
    vector<int> duplicates = findDuplicates(arr);

    // Print the duplicates
    cout << "Duplicates: ";
    for (int i = 0; i < duplicates.size(); i++) {
        cout << duplicates[i] << " ";
    }
    cout << endl;

    return 0;
}
